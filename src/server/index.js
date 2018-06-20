import Hapi from 'hapi'
import path from 'path'
import fs from 'fs'
import { address } from 'ip'

const server = Hapi.server({
    port: 4200,
    host: process.argv[2] === 'dev' ? '127.0.0.1' : address()
});

export const start = async ({

}) => {

    await server.register(require('inert'))
    console.log('ADDRESS', address())
    server.route({
        method: 'GET',
        path: '/{file*}',
        handler: {
            directory: {
                path: request => {
                    console.log('App location:', request.headers.applocation)
                    console.log('file request:', request.params.file)
                    console.log('----->', fs.existsSync(request.params.file))
                    const { applocation: dir } = request.headers
                    console.log('dir', dir)
                    return request.params.file
                },
                listing: true
            }  
        }

    })

    await server.start()
    console.log('Server running at:', server.info)
    
}
