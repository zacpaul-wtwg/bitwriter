// editorDecorators.ts
import { CompositeDecorator } from "draft-js"
import DoneTagComponent from "./SpanTagComponent"
import { doneTagStrategy } from "./doneTagStrategy"

export const createDecorator = (entityDisplayTexts) => {
	return new CompositeDecorator([
		{
			strategy: doneTagStrategy,
			component: (props) => (
				<DoneTagComponent {...props} entityDisplayTexts={entityDisplayTexts} />
			),
		},
	])
}
