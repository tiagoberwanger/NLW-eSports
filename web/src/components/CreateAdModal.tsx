import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Togglegroup from '@radix-ui/react-toggle-group'

import { Check, GameController } from "phosphor-react";

import { CreateAdBanner } from './CreateAdBanner';
import { Input } from './Input';
import { FormEvent, useEffect, useState } from 'react';

interface Game {
    id: string,
    title: string,
}

function CreateAdModal() {
    const [games, setGames] = useState<Game[]>([])
    const [weekDays, setWeekDays] = useState<string[]>([])
    const [useVoiceChannel, setVoiceChannel] = useState(false)
    const [open, setOpen] = useState<boolean | undefined>()

    useEffect(() => {
        fetch('http://localhost:3333/games')
            .then(response => response.json())
            .then(data => setGames(data))
    }, [])

    async function handleCreateAd(e: FormEvent) {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement)
        const data = Object.fromEntries(formData)

        await fetch(`http://localhost:3333/games/${data.game}/ads`, {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: weekDays,
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: useVoiceChannel
            })

        })
            .then(() => setOpen(false))
            .catch((e) => console.log('Error', e))

    }

    return (
        <Dialog.Root open={open}>

            <div className="pt-1 bg-nlw-gradient self-stretch rounded-lg mt-8 overflow-hidden">
                <CreateAdBanner />
            </div>

            <Dialog.Portal>
                <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

                <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
                    <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>

                    <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name">Qual o jogo</label>
                            <select
                                id='game'
                                name='game'
                                className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500'
                            >
                                {games.map(game =>
                                    <option key={game.id} value={game.id}>{game.title}</option>
                                )}
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="name">Seu nome (ou nickname)</label>
                            <Input id="name" name="name" placeholder="Como te chamam dentro do game?" />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
                                <Input id="yearsPlaying" name="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="discord">Qual o seu Discord?</label>
                                <Input id="discord" name="discord" type="text" placeholder="Usuario#0000" />
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="weekDays">Quando costuma jogar?</label>
                                <Togglegroup.Root
                                    type='multiple'
                                    className="grid grid-cols-4 gap-2"
                                    value={weekDays}
                                    onValueChange={setWeekDays}
                                >
                                    <Togglegroup.Item
                                        value="0"
                                        title="Domingo"
                                        className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        D
                                    </Togglegroup.Item>
                                    <Togglegroup.Item
                                        value="1"
                                        title="Segunda"
                                        className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        S
                                    </Togglegroup.Item>
                                    <Togglegroup.Item
                                        value="2"
                                        title="Terça"
                                        className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        T
                                    </Togglegroup.Item>
                                    <Togglegroup.Item
                                        value="3"
                                        title="Quarta"
                                        className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        Q
                                    </Togglegroup.Item>
                                    <Togglegroup.Item
                                        value="4"
                                        title="Quinta"
                                        className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        Q
                                    </Togglegroup.Item>
                                    <Togglegroup.Item
                                        value="5"
                                        title="Sexta"
                                        className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        S
                                    </Togglegroup.Item>
                                    <Togglegroup.Item
                                        value="6"
                                        title="Sábado"
                                        className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        S
                                    </Togglegroup.Item>
                                </Togglegroup.Root>
                            </div>
                            <div className="flex flex-col gap-2 flex-1">
                                <label htmlFor="hourStart">Qual horário do dia?</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <Input id="hourStart" name="hourStart" type="time" placeholder="De" />
                                    <Input id="hourEnd" name="hourEnd" type="time" placeholder="Até" />
                                </div>
                            </div>
                        </div>

                        <label className="mt-2 flex gap-2 text-sm">
                            <Checkbox.Root
                                className='w-6 h-6 p-1 rounded bg-zinc-900'
                                checked={useVoiceChannel}
                                onCheckedChange={(checked) => checked === true ? setVoiceChannel(true) : setVoiceChannel(false)}
                            >
                                <Checkbox.Indicator>
                                    <Check className='w-4 h-4 text-emerald-400' />
                                </Checkbox.Indicator>
                            </Checkbox.Root>
                            Costumo me conectar ao chat de voz
                        </label>

                        <footer className="mt-4 flex justify-end gap-4">
                            <Dialog.Close
                                type="button"
                                className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
                            >
                                Cancelar
                            </Dialog.Close>
                            <button
                                type="submit"
                                className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                            >
                                <GameController className="w-6 h-6" />
                                Encontrar duo
                            </button>
                        </footer>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root >
    );
}

export default CreateAdModal;