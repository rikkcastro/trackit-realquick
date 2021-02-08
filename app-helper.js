module.exports = {
	API_URL: "https://glacial-stream-14199.herokuapp.com/api",
	getAccessToken: () => localStorage.getItem('token'),
	toJSON: (response) => response.json()
}