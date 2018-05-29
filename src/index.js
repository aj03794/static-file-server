import { redis } from './redis'
import { start } from './server'

const { publish, subscribe } = redis()

start({
	publish,
	subscribe
})


