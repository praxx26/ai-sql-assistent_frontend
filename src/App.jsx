import { useEffect, useState } from 'react'

const API_BASE = 'http://127.0.0.1:8000'

export default function App() {

  const [mode, setMode] = useState('database')
  const [question, setQuestion] = useState('')

  const [host, setHost] = useState('localhost')
  const [port, setPort] = useState('3306')
  const [user, setUser] = useState('root')
  const [password, setPassword] = useState('')
  const [database, setDatabase] = useState('company')

  const [sqlQuery, setSqlQuery] = useState('')
  const [explanation, setExplanation] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [executionTime, setExecutionTime] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const [studyHistory, setStudyHistory] = useState([])
  const [executeHistory, setExecuteHistory] = useState([])


  const fetchStudyHistory = async () => {

    try {

      const response = await fetch(`${API_BASE}/study-history`)

      const data = await response.json()

      setStudyHistory(data.history || [])

    } catch (err) {
      console.log(err)
    }
  }


  const fetchExecuteHistory = async () => {

    try {

      const response = await fetch(`${API_BASE}/execute-history`)

      const data = await response.json()

      setExecuteHistory(data.history || [])

    } catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {

    fetchStudyHistory()

    fetchExecuteHistory()

  }, [])


  const handleGenerate = async () => {

    setLoading(true)

    setError('')

    setSqlQuery('')

    setExplanation('')

    setResults([])

    try {

      if (mode === 'database') {

        const response = await fetch(
          `${API_BASE}/generate-and-execute?limit=${limit}&page=${currentPage}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              host,
              port: Number(port),
              user,
              password,
              database,
              question
            })
          }
        )

        const data = await response.json()

        if (data.error) {
          setError(data.error)
        } else {
          setSqlQuery(data.sql_query)
          setExplanation(data.explanation)
          setResults(data.results || [])
          setExecutionTime(data.execution_time_seconds || 0)

          fetchExecuteHistory()
        }

      } else {

        const response = await fetch(`${API_BASE}/study-sql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            question
          })
        })

        const data = await response.json()

        if (data.error) {
          setError(data.error)
        } else {
          setSqlQuery(data.sql_query)
          setExplanation(data.explanation)

          fetchStudyHistory()
        }
      }

    } catch (err) {

      setError('Backend connection failed')

    } finally {

      setLoading(false)
    }
  }


  const clearStudyHistory = async () => {

    await fetch(`${API_BASE}/delete-study-history`, {
      method: 'DELETE'
    })

    fetchStudyHistory()
  }


  const clearExecuteHistory = async () => {

    await fetch(`${API_BASE}/delete-execute-history`, {
      method: 'DELETE'
    })

    fetchExecuteHistory()
  }


  const tableColumns = results.length > 0
    ? Object.keys(results[0])
    : []


  return (
    <div className="min-h-screen bg-black text-white p-6">

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[95vh]">

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 flex flex-col overflow-hidden">

          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              SQLMind AI
            </h1>

            <p className="text-zinc-400 mt-2 text-sm">
              AI Powered SQL Workspace
            </p>
          </div>


          <div className="grid grid-cols-2 gap-3 mt-8">

            <button
              onClick={() => setMode('database')}
              className={`rounded-2xl py-3 font-medium transition ${
                mode === 'database'
                  ? 'bg-white text-black'
                  : 'bg-zinc-800 hover:bg-zinc-700'
              }`}
            >
              Database
            </button>


            <button
              onClick={() => setMode('study')}
              className={`rounded-2xl py-3 font-medium transition ${
                mode === 'study'
                  ? 'bg-white text-black'
                  : 'bg-zinc-800 hover:bg-zinc-700'
              }`}
            >
              Study
            </button>
          </div>


          <div className="mt-8 flex-1 overflow-auto">

            <div className="flex items-center justify-between mb-4">

              <h2 className="font-semibold text-lg">
                {mode === 'database'
                  ? 'Execute History'
                  : 'Study History'}
              </h2>


              <button
                onClick={mode === 'database'
                  ? clearExecuteHistory
                  : clearStudyHistory}
                className="text-xs text-red-400 hover:text-red-300"
              >
                Clear
              </button>
            </div>


            <div className="space-y-3">

              {(mode === 'database'
                ? executeHistory
                : studyHistory).map((item, index) => (

                <div
                  key={index}
                  className="bg-zinc-800 rounded-2xl p-4 hover:bg-zinc-700 transition cursor-pointer"
                >
                  <p className="text-sm font-medium line-clamp-2">
                    {item.question}
                  </p>

                  <p className="text-xs text-zinc-400 mt-2">
                    {item.created_at}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>


        <div className="lg:col-span-3 grid grid-rows-[auto_auto_1fr] gap-6 overflow-hidden">

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 overflow-auto">

            {mode === 'database' && (

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">

                <input
                  type="text"
                  placeholder="Host"
                  value={host}
                  onChange={(e) => setHost(e.target.value)}
                  className="bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 outline-none"
                />

                <input
                  type="text"
                  placeholder="Port"
                  value={port}
                  onChange={(e) => setPort(e.target.value)}
                  className="bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 outline-none"
                />

                <input
                  type="text"
                  placeholder="User"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  className="bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 outline-none"
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 outline-none"
                />

                <input
                  type="text"
                  placeholder="Database"
                  value={database}
                  onChange={(e) => setDatabase(e.target.value)}
                  className="bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 outline-none"
                />
              </div>
            )}


            <div className="flex flex-col lg:flex-row gap-4">

              <textarea
                rows={3}
                placeholder="Ask your SQL question here..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="flex-1 bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 outline-none resize-none"
              />


              <button
                onClick={handleGenerate}
                disabled={loading}
                className="bg-white text-black rounded-2xl px-8 py-4 font-semibold hover:scale-[1.02] transition"
              >
                {loading ? 'Generating...' : 'Generate'}
              </button>
            </div>


            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

              <div className="bg-zinc-800 rounded-2xl p-4">
                <p className="text-zinc-400 text-sm">Execution Time</p>
                <h3 className="text-xl font-bold mt-2">
                  {executionTime}s
                </h3>
              </div>


              <div className="bg-zinc-800 rounded-2xl p-4">
                <p className="text-zinc-400 text-sm">Rows Returned</p>
                <h3 className="text-xl font-bold mt-2">
                  {results.length}
                </h3>
              </div>


              <div className="bg-zinc-800 rounded-2xl p-4">
                <p className="text-zinc-400 text-sm">Current Page</p>
                <h3 className="text-xl font-bold mt-2">
                  {currentPage}
                </h3>
              </div>


              <div className="bg-zinc-800 rounded-2xl p-4">
                <p className="text-zinc-400 text-sm">Mode</p>
                <h3 className="text-xl font-bold mt-2 capitalize">
                  {mode}
                </h3>
              </div>
            </div>
          </div>


          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden">

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 overflow-auto">

              <div className="flex items-center justify-between mb-4">

                <h2 className="font-semibold text-lg">
                  Generated SQL
                </h2>


                <button
                  onClick={() => navigator.clipboard.writeText(sqlQuery)}
                  className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-xl text-sm"
                >
                  Copy
                </button>
              </div>


              <pre className="bg-black rounded-2xl p-5 overflow-auto text-green-400 text-sm leading-7 min-h-[250px]">
                {sqlQuery || 'Generated SQL appears here...'}
              </pre>
            </div>


            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 overflow-auto">

              <h2 className="font-semibold text-lg mb-4">
                AI Explanation
              </h2>


              <div className="bg-zinc-800 rounded-2xl p-5 text-zinc-300 leading-8 text-sm min-h-[250px]">
                {explanation || 'AI explanation appears here...'}
              </div>
            </div>
          </div>


          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 overflow-hidden flex flex-col">

            <div className="flex items-center justify-between mb-4">

              <h2 className="font-semibold text-lg">
                Query Results
              </h2>


              <div className="flex items-center gap-3">

                <select
                  value={limit}
                  onChange={(e) => setLimit(Number(e.target.value))}
                  className="bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-sm"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>


            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-400 rounded-2xl p-4 mb-4">
                {error}
              </div>
            )}


            <div className="flex-1 overflow-auto rounded-2xl border border-zinc-800">

              <table className="w-full text-sm">

                <thead className="bg-zinc-800 sticky top-0">

                  <tr>
                    {tableColumns.map((column) => (
                      <th
                        key={column}
                        className="text-left p-4 capitalize"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>


                <tbody>

                  {results.map((row, index) => (

                    <tr
                      key={index}
                      className="border-t border-zinc-800 hover:bg-zinc-800/40"
                    >

                      {tableColumns.map((column) => (

                        <td key={column} className="p-4">
                          {String(row[column])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>


            <div className="flex items-center justify-between mt-4">

              <p className="text-sm text-zinc-400">
                Showing {results.length} rows
              </p>


              <div className="flex items-center gap-3">

                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-xl text-sm"
                >
                  Previous
                </button>


                <div className="bg-white text-black px-4 py-2 rounded-xl text-sm font-semibold">
                  {currentPage}
                </div>


                <button
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-xl text-sm"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
