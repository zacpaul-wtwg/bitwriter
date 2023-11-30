type ButtonProps = {
	variant?: "primary" | "secondary"
	type?: "submit" | "button" | "reset"
	children: React.ReactNode
	onClick?: () => void // Optional click handler prop
}

export const Button: React.FC<ButtonProps> = ({
	variant = "primary",
	type = "button",
	children,
	onClick,
}) => {
	return (
		<>
			<button type={type} className={variant} onClick={onClick}>
				{children}
			</button>
			<style jsx>
				{`
					button {
						padding: 10px 20px;
						border: none;
						border-radius: 4px;
						cursor: pointer;
						color: white;
					}
					.primary {
						background-color: var(--main-accent);
					}
					.secondary {
						background-color: var(--main-background-dark);
						border: solid 1px var(--gray-light);
					}
				`}
			</style>
		</>
	)
}
