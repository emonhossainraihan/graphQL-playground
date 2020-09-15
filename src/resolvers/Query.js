function feed(parent, args, context) {
    return context.prisma.link.findMany();
}
function info(parent) {
    return 'Hello buddy, This GraphQL playground is created by Emon Hossain'
}
module.exports = {
    feed,
    info
}