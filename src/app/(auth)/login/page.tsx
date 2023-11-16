"use client"
import Messages from "./messages"

export default function Login() {
	return (
		<div className='login-container'>
			<form className='form' action='/auth/sign-in' method='post'>
				<label htmlFor='email' className='form-label'>
					Email
				</label>
				<input
					className='form-input'
					name='email'
					placeholder='you@example.com'
					required
				/>
				<label htmlFor='password' className='form-label'>
					Password
				</label>
				<input
					className='form-input'
					type='password'
					name='password'
					placeholder='••••••••'
					required
				/>
				<button className='form-button primary'>Sign In</button>
				<button formAction='/auth/sign-up' className='form-button secondary'>
					Sign Up
				</button>
				<Messages />
			</form>

			<style jsx>{`
				.login-container {
					display: flex;
					flex-direction: column;
					width: 100%;
					max-width: 400px;
					margin: auto;
					padding: 2rem;
					gap: 1rem;
				}

				.back-button:hover {
					background-color: #e2e2e2;
				}

				.form {
					display: flex;
					flex-direction: column;
					gap: 0.5rem;
				}

				.form-label {
					margin-bottom: 0.5rem;
				}

				.form-input {
					padding: 0.5rem 1rem;
					border: 1px solid #ddd;
					border-radius: 0.375rem;
					margin-bottom: 1rem;
				}

				.form-button {
					padding: 0.75rem 1rem;
					border-radius: 0.375rem;
					font-weight: bold;
					font-size: 0.875rem;
					margin-bottom: 1rem;
					cursor: pointer;
				}

				.primary {
					background-color: var(--main-accent);
					border: none;
					color: white;
				}

				.secondary {
					background-color: transparent;
					color: #333;
					border: 1px solid #333;
				}
			`}</style>
		</div>
	)
}
