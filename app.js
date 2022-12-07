const apiUrl = "https://covid19-brazil-api.now.sh/api/report/v1"

const getCountry = async () => {
  try {
    const response = await fetch(apiUrl+"/brazil",{
      method: "GET"
    })

    const cases = await response.json() 

    casesBrazil.innerHTML = await cases.data.confirmed + cases.data.deaths
    deathBrazil.innerHTML = await cases.data.deaths
    confirmedBrazil.innerHTML = await cases.data.confirmed
    const covidCasesData = document.querySelector(".covidCases .covidCasesData")
    covidCasesData.classList.remove("hide")
    const loading = document.querySelector(".covidCases .loading")
    loading.classList.add("hide")
  } catch (error) {
    console.error(error)
    alert("Não foi possível buscar os casos do país ")
  }
}

getCountry()

const getStates = async () => {

  try {
    const response = await fetch(apiUrl,{
      method: "GET"
    })

    const cases = await response.json()
    await cases.data.forEach(state => {
      listCovidByState.innerHTML += `
      <div>
        <div class="titleState">
          <img src="https://raw.githubusercontent.com/bgeneto/bandeiras-br/master/imagens/${state.uf}.png" alt="">
          <span>${state.state}</span>
        </div>
        <div class="covidCasesData">
          <h4>${state.cases || "não foi possivel buscar"} Casos</h4>
          <h4>${state.deaths || "não foi possivel buscar"} Mortes</h4>
          <h4>${state.suspects || "não foi possivel buscar"} Suspeitos</h4>
        </div>
      </div>
      `
      
      listCovidByState.classList.remove("hide")
      const loading = document.querySelector("#stateList .loading")
      loading.classList.add("hide")
    });

    
  } catch (error) {
    console.error(error)
    alert("não foi possível buscar os casos por estados")
  }

}

getStates() 