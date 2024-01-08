import { useEffect, useState } from 'react'
import './App.css'
import pikachu from './assets/ピカチュウ.gif'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faBackspace } from '@fortawesome/free-solid-svg-icons'

function App() {
  const [query, setQuery] = useState<any>([''])
  const [quantValues, setQuantValues] = useState(0)
  const [result, setResult] = useState('')
  const [update, setUpdate] = useState(0)

  useEffect(() => { console.log(query) }, [update])

  const cleanValues = () => {
    setQuery([''])
    setQuantValues(0)
    setResult('')
  }

  const setValue = (value: string) => {
    let newValues = query
    let newQuant = quantValues

    if (value === "+" || value === "/" || value === "-" || value === "*" || value === "√") {
      newQuant = quantValues + 1
      newValues[newQuant] = value
      setQuantValues(newQuant + 1)
      newValues[newQuant + 1] = ''
      setQuery(newValues)
    } else {
      newValues[quantValues] = newValues[quantValues] + value
      setQuery(newValues)
    }

    // console.log(newValues)

    setUpdate(update + 1)
  }

  const printResult = () => {
    let finalResult: any = ''
    query.map((value: string, i: number) => {
      if (i === 0)
        finalResult = value
      switch (value) {
        case '+':
          finalResult = sum(parseInt(finalResult), parseInt(query[i + 1]))
          break;
        case '-':
          finalResult = minus(parseInt(finalResult), parseInt(query[i + 1]))
          break;
        case '/':
          finalResult = div(parseInt(finalResult), parseInt(query[i + 1]))
          break;
        case '*':
          finalResult = times(parseInt(finalResult), parseInt(query[i + 1]))
          break;
        case '√':
          finalResult = sqrt(parseInt(finalResult))
          break;
      }
    })
    setResult(finalResult)
  }

  const sum = (value1: number, value2: number) => {
    return value1 + value2
  }
  const minus = (value1: number, value2: number) => {
    return value1 - value2
  }
  const div = (value1: number, value2: number) => {
    return value1 / value2
  }
  const times = (value1: number, value2: number) => {
    return value1 * value2
  }
  const sqrt = (value1: number) => {
    return parseFloat(Math.sqrt(value1).toFixed(12))
  }
  return (

    <div className='container vh-100 align-items-center justify-content-center d-flex'>
      <div className='row d-flex justify-content-center calculator-body'>
        <label style={{ color: 'white' }}>dhLra</label>
        <div className='col-11 mt-3 d-flex flex-column justify-content-start align-items-start calculator-display'>
          <p style={{ padding: 0, margin: 0 }}>{query.map((value: string) => {
            return value
          })}</p>
          {result === '' ? <h1>{query[quantValues]}</h1> : <h1>{result}</h1>}
        </div>
        <div className='col-12 mt-3 calculcator-number-pad align-items-center p-0' style={{ position: 'relative', right: '0' }}>
          <div className='row mb-3 mt-3'>
            <div className='col-12 d-flex flex-row pe-4'>
              <a href="https://github.com/dhLra" target='_blanck'><button className='btn-midia mb-1' onClick={() => cleanValues()}><FontAwesomeIcon icon={faGithub} /></button></a>
              <a href="https://www.linkedin.com/in/dhiego-lira-7291b521a/" target='_blanck'><button className='btn-midia mb-1' onClick={() => cleanValues()}><FontAwesomeIcon icon={faLinkedin} /></button></a>
              <a href="https://www.instagram.com/dhinovonao/" target='_blanck'><button className='btn-midia mb-1' onClick={() => cleanValues()}><FontAwesomeIcon icon={faInstagram} /></button></a>
              <div className='gif-display' style={{ border: "green solid 1px", width:"100px", marginLeft:"40px", zIndex:"1000" }}>
              </div>
              <img src={pikachu} width={90} style={{ position: 'absolute', right: '15px', top: '10px',  zIndex:"900" }}></img>
            </div>
          </div>
          <div className='row d-flex flex-row'>
            <div className='col-8 number-pad pe-0'>
              <button className='btn-number mb-2' onClick={() => setValue('1')}>1</button>
              <button className='btn-number mb-2' onClick={() => setValue('2')}>2</button>
              <button className='btn-number mb-2' onClick={() => setValue('3')}>3</button>
              <button className='btn-number mb-2' onClick={() => setValue('4')}>4</button>
              <button className='btn-number mb-2' onClick={() => setValue('5')}>5</button>
              <button className='btn-number mb-2' onClick={() => setValue('6')}>6</button>
              <button className='btn-number mb-2' onClick={() => setValue('7')}>7</button>
              <button className='btn-number mb-2' onClick={() => setValue('8')}>8</button>
              <button className='btn-number mb-2' onClick={() => setValue('9')}>9</button>
              <button className='btn-number mb-2' onClick={() => setValue('0')}>0</button>
              <button className='btn-number mb-2' onClick={() => setValue('00')}>00</button>
              <button className='btn-number mb-2' onClick={() => setValue('.')}>.</button>
            </div>
            <div className='col-4 number-pad justify-content-start ps-0 align-items-start'>
              <button className='btn-symbol mb-1' onClick={() => cleanValues()} style={{ backgroundColor: "red" }}>C</button>
              <button className='btn-symbol mb-1' onClick={() => cleanValues()} style={{ backgroundColor: "gray" }}><FontAwesomeIcon icon={faBackspace} /></button>
              <button className='btn-symbol mb-2' onClick={() => setValue('+')}>+</button>
              <button className='btn-symbol mb-2' onClick={() => setValue('-')}>-</button>
              <button className='btn-symbol mb-2' onClick={() => setValue('√')}>√</button>
              <button className='btn-symbol mb-2' onClick={() => setValue('*')}>*</button>
              <button className='btn-symbol mb-2' onClick={() => setValue('/')}>/</button>
              <button className='btn-symbol mb-2' onClick={() => printResult()}>=</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default App
