export default function toNum(str){
	
	const stringArray = [...str]
	const filteredArray = stringArray.filter(element => element !== "," )

	return parseInt(filteredArray.reduce((x,y) => x + y))
}
