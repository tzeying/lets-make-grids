// https://master.api-cubbystorag-review.cubby.coherencesites.com/leases/402/balance/outstanding

const OutstandingBalanceHandler = async (req, res) => {
    const { query } = req;
    const { id, token } = query;

    const response = await fetch(
        `https://master.api-cubbystorag-review.cubby.coherencesites.com/leases/${id}/balance/outstanding`,
        { headers: { Authorization: `Bearer ${token}` } })

    const data = await response.json();

    return res.status(200).json(data)

}

export default OutstandingBalanceHandler;