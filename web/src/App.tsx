import { useEffect, useState } from 'react'

import GameBanner from './components/GameBanner'
import CreateAdModal from './components/CreateAdModal'

import Header from './components/Header'

import './styles/main.css'

interface Game {
    id: string,
    title: string,
    bannerUrl: string,
    _count: {
        ads: number,
    }
}

function App() {
    const [games, setGames] = useState<Game[]>([])

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

            <CreateAdModal />

        </div>
    )
}

export default App
