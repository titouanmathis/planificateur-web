import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import { forEach, shuffle, chunk, clean } from './utils'

Vue.use(Vuex)

const studentsCache = localStorage.getItem('students')
const students = studentsCache ? studentsCache.split(',') : []

const datesCache = localStorage.getItem('dates')
const dates = datesCache ? datesCache.split(',') : []

const results = []


export default new Vuex.Store({
	strict: true,
	state: { students, dates, results },
	mutations: {
		SAVE_STUDENTS(state, students) {
			state.students = students
			localStorage.setItem('students', state.students)
		},
		SAVE_DATES(state, dates) {
			state.dates = dates
			localStorage.setItem('dates', state.dates)
		},
		toggleDate(state, date) {
			const index = state.dates.indexOf(date)
			index < 0 && state.dates.push(date)
			index > -1 && state.dates.splice(index, 1)
			state.dates.sort()
			localStorage.setItem('dates', state.dates)
		},
		resetResults(state) {
			state.results = []
		},
		getResults(state) {
			console.log('getResults');
			// Empty results
			state.results = []

			// Create chunks
			const cleanedStudents = clean(state.students)
			const cleanedDates = clean(state.dates)
			const chunkLength = Math.ceil(cleanedStudents.length / cleanedDates.length)
			const temp = chunk(shuffle(cleanedStudents), chunkLength)

			// Format result
			forEach(cleanedDates, (date, i) => {
				state.results.push({
					date: date,
					// date: moment(date).format('dddd DD MMMM'),
					students: temp[i]
				})
			})
		},
		emptyCache(state) {
			state.students = []
			state.dates = []
			localStorage.setItem('students', state.students)
			localStorage.setItem('dates', state.dates)
		}
	}
})
