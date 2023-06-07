import express from 'express'
import {ApolloServer} from '@apollo/server'
import {expressMiddleware} from '@apollo/server/express4'
import cors from 'cors'
import http from 'http'

export async function startApolloServer (typeDefs,resolvers){
    const app = express()
    app.get('/',(req,res)=>res.send('welcome my api graphql'))
    const httpServer =http.createServer(app)

    const server =new ApolloServer({
        typeDefs:typeDefs,
        resolvers:resolvers
    })
    await server.start()
    app.use('/graphql',cors(),express.json(),expressMiddleware(server))
    await new Promise(resolve=>httpServer.listen({
        port:4000
    },resolve))
    console.log('server ready in port 4000')
}

