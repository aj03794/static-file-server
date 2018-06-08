import { redis } from './redis'
import { start } from './server'

const { publisherCreator, subscriberCreator } = redis()

Promise.all([
	publisherCreator(),
	subscriberCreator()
])
.then(([
	{ publish },
	{ subscribe }
]) => {
	return start({
		publish,
		subscribe
	})
})

