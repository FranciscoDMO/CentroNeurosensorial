import axios from 'axios';
//import Cookie from 'universal-cookie';

export async function getTokenOrRefresh() {
    //const cookie = new Cookie();
    //const speechToken = cookie.get('speech-token');
    const speechToken = undefined;
    if (speechToken === undefined) {
        try {
            const speechKey = "ab978e2d1ac94491bfc1f9048eaf46f0";
            const speechRegion = "westeurope";

            const headers = {
                headers: {
                    'Ocp-Apim-Subscription-Key': speechKey,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };

            const tokenResponse = await axios.post(`https://${speechRegion}.api.cognitive.microsoft.com/sts/v1.0/issueToken`, null, headers);
            //cookie.set('speech-token', speechRegion + ':' + tokenResponse.data, {maxAge: 540, path: '/'});

            console.log('Token fetched from back-end: ' + tokenResponse.data);
            return {authToken: tokenResponse.data, region: speechRegion};

        } catch (err) {
            console.log(err.response.data);
            return { authToken: null, error: err.response.data };
        }
    } /*else {
        console.log('Token fetched from cookie: ' + speechToken);
        const idx = speechToken.indexOf(':');
        return { authToken: speechToken.slice(idx + 1), region: speechToken.slice(0, idx) };
    }*/
}