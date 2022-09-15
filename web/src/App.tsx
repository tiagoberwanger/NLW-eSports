import { useEffect, useState } from 'react'

import GameBanner from './components/GameBanner'
import CreateAdBanner from './components/CreateAdBanner'
import Header from './components/Header'

import './styles/main.css'

function App() {
    const [games, setGames] = useState([])

    useEffect(() => {
        fetch('http://localhost:3333/games')
            .then(response => response.json())
            .then(data => setGames(data))
    }, [])

    return (
        <div className="max-w-[1344px] mx-auto flex items-center flex-col my-20">
            <Header />

            <div className='grid grid-cols-6 gap-6 mt-16'>
                {games.map((game) =>
                    <GameBanner
                        key={game['id']}
                        bannerUrl={game['bannerUrl']}
                        title={game['title']}
                        adsCount={game['_count']['ads'] || 0}
                    />
                )}
            </div>
            <div className="pt-1 bg-nlw-gradient self-stretch rounded-lg mt-8 overflow-hidden">
                <CreateAdBanner />
            </div>
        </div>
    )
}

export default App
