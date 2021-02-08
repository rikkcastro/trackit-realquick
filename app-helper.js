module.exports = {
	API_URL: "http://localhost:4000/api",
	getAccessToken: () => localStorage.getItem('token'),
	toJSON: (response) => response.json()
}