// import Mongoose models
const Project = require('../models/Project')
const Client = require('../models/Client')

//creating the graphQL object type
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList} = require('graphql')

// PROJECT TYPE
const ProjectType = new GraphQLObjectType({
    name: 'Projects',
    fields: () => ({
        id: {type: GraphQLID}, 
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        status: {type: GraphQLString},
        client: {
            type: ClientType,
            resolve(parentValue, args){
                return clients.findById(parentValue.clientId) 
            }
        }
    })
})

// CLIENT TYPE
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString},
        phone: { type: GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        projects:{
            type: GraphQLList(ProjectType),
            resolve(parentValue, args){
                return Project.find();
            }
        },
        project: {
            type: ProjectType,
            args: { id: {type: GraphQLID} },
            resolve(parentValue, args){
                return Project.findById(args.id);
            }
        },
        clients:{
            type: GraphQLList(ClientType),
            resolve(parentValue, args){
                return Client.find()
            }
        },
        client: {
            type: ClientType,
            args: { id: {type: GraphQLID} },
            resolve(parentValue, args){
                return Client.findById(args.id);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})
