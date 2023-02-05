function Calculator() {

    // fetch(`${process.env.BASE_URL}/api/leases?token=123&id=388`).then(x => console.log(x))
    console.log(process.env.NEXT_PUBLIC_VERCEL_URL)
    return (
        <div>

        </div>
    )
}

// export async function getServerSideProps() {

    // const getToken = await fetch('https://master.api-cubbystorag-review.cubby.coherencesites.com/auth/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: '{"username":"site.manager","password":"cubby*!$"}'
    // })

    // const tokenRes = await getToken.json();
    // const token = tokenRes.token.token;

    // const res = await fetch(
    //     'https://master.api-cubbystorag-review.cubby.coherencesites.com/leases/388',
    //     { headers: { Authorization: `Bearer ${token}` } })

    // const leaseData = await res.json()

    // return { props: { data: leaseData, token } }
// }

export default Calculator;