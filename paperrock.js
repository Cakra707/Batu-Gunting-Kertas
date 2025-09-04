let score = JSON.parse(localStorage.getItem('score')) || { // default operator shortcut
  win: 0,
  lose: 0,
  tie: 0
}

scoreelement()

/* Sama kaya di atas
if (!score) {
  score = {
    win: 0,
    lose: 0,
    tie: 0
  }
}
*/

const konfir = document.querySelector('.konfir')
konfir.hidden = true

document.querySelector('.yes').addEventListener('click', () => {
  resetscore()
  konfir.hidden = true
})

document.querySelector('.no').addEventListener('click', () => {
  konfir.hidden = true
})

document.querySelector('.rb').addEventListener('click', () => {
  konfir.hidden = false
})

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'Backspace') {
    konfir.hidden = false
  }
})

document.querySelector('.autoplay').addEventListener('click', () => {
  autoplay()
  stop()
})

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'a') {
    autoplay()
  }
})

let autoplaying = false
let intervalId = ''

// const autoplay = () => {}

function autoplay() {
  if (!autoplaying) {
    intervalId = setInterval(() => {
      const pmove = computerMove()
      play(pmove)
    }, 1000)

    autoplaying = true
    document.querySelector('.autoplay').innerHTML = 'Stop permainan'
  } else {
    clearInterval(intervalId)
    autoplaying = false
    document.querySelector('.autoplay').innerHTML = 'Permainan Otomatis'
  }
}

// const play = pmove => {}

document.querySelector('.rockbtb').addEventListener('click', () => { 
  play('Batu') 
})

document.querySelector('.scissorbtb').addEventListener('click', () => { 
  play('Gunting') 
})

document.querySelector('.paperbtb').addEventListener('click', () => { 
  play('Kertas') 
})

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'b') {
    play('Batu')
  } else if (event.key === 'g') {
    play('Gunting')
  } else if (event.key === 'k') {
    play('Kertas')
  }
})

function resetscore() {
  score.win = 0
  score.lose = 0
  score.tie = 0
  localStorage.removeItem('score')
  scoreelement()
}

function play(pmove) {
  const computer = computerMove()
  let result = ''

  if (pmove === 'Kertas') {
    if (computer === 'Batu') {
      result = 'Kamu menang'
    } else if (computer === 'Gunting') {
      result = 'Kamu kalah'
    } else if (computer === 'Kertas') {
      result = 'Seri'
    }
  } else if (pmove === 'Gunting') {
    if (computer === 'Batu') {
      result = 'Kamu kalah'
    } else if (computer === 'Gunting') {
      result = 'Seri'
    } else if (computer === 'Kertas') {
      result = 'Kamu menang'
    }
  } else {
    if (computer === 'Batu') {
      result = 'Seri'
    } else if (computer === 'Gunting') {
      result = 'Kamu menang'
    } else if (computer === 'Kertas') {
      result = 'Kamu kalah'
    }
  }

  if (result === 'Kamu menang') {
    score.win += 1
  } else if (result === 'Kamu kalah') {
    score.lose += 1
  } else if (result === 'Seri') {
    score.tie += 1
  }

  localStorage.setItem('score', JSON.stringify(score))

  document.querySelector('.updsc').innerText = `${result}`

  document.querySelector('.updmove').innerHTML = `
    Kamu <img src="images/${pmove}-emoji.png" class="img"> 
    VS 
    <img src="images/${computer}-emoji.png" class="img"> Komputer
  `

  scoreelement()
}

function scoreelement() {
  document.querySelector('.scoreshow').innerHTML =
    `Menang: ${score.win}, Kalah: ${score.lose}, Seri: ${score.tie}`
}

function computerMove() {
  const randomNumber = Math.random()
  let computer = ''

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computer = 'Kertas'
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computer = 'Batu'
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computer = 'Gunting'
  }

  return computer
}
