// src/hooks/useOutsideClickHandler.ts
import { useEffect } from "react"

const useOutsideClickHandler = (refs, callback) => {
	useEffect(() => {
		const handleClickOutside = (event) => {
			let isOutside = true
			refs.current.forEach((ref) => {
				if (ref && ref.contains(event.target)) {
					isOutside = false
				}
			})
			if (isOutside && callback) {
				callback()
			}
		}

		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [refs, callback])
}

export default useOutsideClickHandler
