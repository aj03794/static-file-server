import Hapi from 'hapi'
import path from 'path'
import fs from 'fs'

const server = Hapi.server({
	port: 4200
});

export const start = async ({

}) => {

    await server.register(require('inert'))

    server.route({
        method: 'GET',
        path: '/js/{file*}',
        handler: {
            directory: {
                path: request => {
                    console.log(request.headers.applocation)
                    console.log(request.params.file)
                    const { applocation: dir } = request.headers
                    console.log('dir', dir)
                    return dir
                },
                listing: true
            }
        }
    })

    await server.start()

    console.log('Server running at:', server.info.uri)
}
