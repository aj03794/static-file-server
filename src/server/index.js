import Hapi from 'hapi'
import path from 'path'
import fs from 'fs'
import { address } from 'ip'

const server = Hapi.server({
    port: 4200,
    // host: '0.0.0.0'
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
                    console.log('App location:', request.headers.applocation)
                    console.log('file request:', request.params.file)
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
