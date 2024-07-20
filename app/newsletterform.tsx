'use client'
import React, { useRef, useState } from 'react'

export interface NewsletterFormProps {
  title?: string
  apiUrl?: string
}

const NewsletterForm = ({
  title = 'Iscriviti alla newsletter per essere aggiornato sugli ultimi post!',
  apiUrl = '/api/newsletter',
}: NewsletterFormProps) => {
  const inputEl = useRef<HTMLInputElement>(null)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const subscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!inputEl.current || !inputEl.current.value) {
      return // Do nothing if input is empty or inputEl is null
    }

    const res = await fetch(apiUrl, {
      body: JSON.stringify({
        email: inputEl.current.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const { error } = await res.json()
    if (error) {
      setError(true)
      setMessage('La tua email non è valida o sei già iscritto.')
      return
    }

    inputEl.current.value = ''
    setError(false)
    setSubscribed(true)
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="pb-1 text-lg font-semibold text-gray-800 dark:text-white">{title}</div>
      <form className="flex flex-col sm:flex-row" onSubmit={subscribe}>
        <label htmlFor="email-input" className="flex-grow">
          <span className="sr-only">Indirizzo email</span>
          <input
            autoComplete="email"
            className="w-full rounded-md px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-hover-500 dark:bg-stone-900"
            id="email-input"
            name="email"
            placeholder={subscribed ? 'Ti sei iscritto !  🎉' : 'Inserisci la tua email'}
            ref={inputEl}
            required
            type="email"
            disabled={subscribed}
          />
        </label>
        <button
          className={`mt-2 w-full rounded-md bg-primary-600 px-4 py-2 font-medium text-white sm:ml-3 sm:mt-0 sm:w-auto ${
            subscribed ? 'cursor-default' : 'hover:bg-hover-500 dark:hover:bg-hover-500'
          } outline-none focus:ring-2 focus:ring-hover-500 focus:ring-offset-2 dark:ring-offset-black`}
          type="submit"
          disabled={subscribed}
        >
          {subscribed ? 'Grazie!' : 'Iscriviti'}
        </button>
      </form>
      {error && <div className="w-full pt-2 text-sm text-red-500 dark:text-red-400">{message}</div>}
      {subscribed && (
        <div className="w-full pt-2 text-sm text-green-500 dark:text-green-400">
          La prima newsletter è in arrivo!🚀
          <br />
          Controlla la tua casella spam se non la trovi.
          <br />E aggiungi peppocola@pompelmo.xyz ai tuoi contatti per non perderla!
        </div>
      )}
    </div>
  )
}

export default NewsletterForm
