import { createServer, Model, Factory, Response, ActiveModelSerializer } from 'miragejs'
import { faker } from '@faker-js/faker'

type User = {
    name: string;
    email: string;
    created_at: string;
};

export function makeServer() {
    const server = createServer({
    // serializers:{
    //     application: ActiveModelSerializer,
    // },

    models: {
        user: Model.extend<Partial<User>>({})
    },

    factories: {
        user: Factory.extend({
            name(i: number) {
                return `User ${i + 1}`
            },
            email() {
                return faker.internet.email().toLowerCase()
            },
            createdAt() {
                return faker.date.recent(10)
            },
        })
    },

    seeds(server) {
        server.createList('user', 200)
    },

        routes() {
            this.namespace = 'api' //sets the folder to this namespace
            this.timing = 750; //add a delay for the calls

            this.get('/users', function (schema, request) {
                const { page = 1, per_page = 10 } = request.queryParams;

                const total = schema.all('user').length;

                const pageStart = (Number(page) - 1) * Number(per_page)
                const pageEnd = pageStart + Number(per_page)

                const users = this.serialize(schema.all('user'))
                  .users.slice(pageStart, pageEnd);

                return new Response(
                    200,
                    {'x-total-count': String(total)},
                    { users }
                )
            })
            this.get('/users/:id')
            this.post('/users')

            this.namespace = ''; //unset the folder
            this.passthrough();  //make the request go forward if its not part of miragejs
        }
    })

    return server;
}