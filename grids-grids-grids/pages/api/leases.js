export default function leaseHandler(req, res) {
    const { query } = req;
    const { id, token } = query;

    // console.log(query)

    return res.status(200).json({ message: `lease: ${id}, token: ${token}` })

}