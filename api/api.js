export default {
    getNews: () => {
        return fetch("https://data.apiv1.vidbrief.com/brief_board_backend")
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    return Promise.resolve([]);
                }
            })
    }
}
