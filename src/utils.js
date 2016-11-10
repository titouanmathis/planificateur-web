/**
 * A forEach method for both Array and NodeList
 * @author Todd Motto
 * @url    https://toddmotto.com/ditch-the-array-foreach-call-nodelist-hack/
 * @param  {array|nodelist}   array    The array/nodelit to loop over
 * @param  {function}         callback The callback function to execute on each item
 * @param  {object}           scope    The scope to execute the callback function in
 * @return {void}
 */
export const forEach = (array, callback, scope) => {
	const length = array.length
	for (let i = 0; i < length; i++) {
		// passes back stuff we need
		callback.call(scope, array[i], i)
	}
}


/**
 * Shuffle the items in an array
 * @param  {array} array The array to shuffle
 * @return {array}       The shuffled array
 */
export const shuffle = (array) => {

	const shuffledArray = array.slice(0)
	let currentIndex = shuffledArray.length
	let temporaryValue
	let randomIndex

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex -= 1

		// And swap it with the current element.
		temporaryValue = shuffledArray[currentIndex]
		shuffledArray[currentIndex] = shuffledArray[randomIndex]
		shuffledArray[randomIndex] = temporaryValue
	}

	return shuffledArray
}


/**
 * Split an array into chunks
 * @param  {array}   array       The array to split
 * @param  {integer} chunkLength The number of items by chunk
 * @return {array}               An array containing all array chunks
 */
export const chunk = (array, chunkLength) => {
	const R = []
	const length = array.length
	for (let i = 0; i < length; i += chunkLength)
		R.push(array.slice(i, i + chunkLength))
	return R;
}


/**
 * Remove all falsy values from an array
 * @param  {array} array The array to clean
 * @return {array}       A new cleaned array
 */
export const clean = (array) => {
	const cleanedArray = []
	const length = array.length
	for (let i = 0; i < length; i++) {
		if (array[i]) {
			cleanedArray.push(array[i]);
		}
	}
	return cleanedArray;
}
