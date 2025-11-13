"use client"

import { useState, useEffect } from "react"
import { Share2, Trophy, Sparkles, Sun, Sunset, Moon, Coins, Gift, CheckCircle2, Lock, Video, Play, ShoppingCart, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

// Preço do app e créditos iniciais
const PRECO_APP = 10.00 // R$ 10,00
const CREDITOS_INICIAIS = 10 // 10 moedas ao comprar o app

// GIFs com preços individuais
const GIFS = {
  bomDia: [
    { url: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif", preco: 1 },
    { url: "https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif", preco: 1 },
    { url: "https://media.giphy.com/media/l0HlQXlQ3nHyLMvte/giphy.gif", preco: 2 },
    { url: "https://media.giphy.com/media/l0MYC0LajbaPoEADu/giphy.gif", preco: 2 },
    { url: "https://media.giphy.com/media/3o6Zt6ML6BklcajjsA/giphy.gif", preco: 3 },
    { url: "https://media.giphy.com/media/l0HlNQ03J5JxX6lva/giphy.gif", preco: 3 },
  ],
  boaTarde: [
    { url: "https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif", preco: 1 },
    { url: "https://media.giphy.com/media/3o7absbD7PbTFQa0c8/giphy.gif", preco: 1 },
    { url: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif", preco: 2 },
    { url: "https://media.giphy.com/media/3o6ZsZdNs3yE5l6hWM/giphy.gif", preco: 2 },
    { url: "https://media.giphy.com/media/l0HlNQ03J5JxX6lva/giphy.gif", preco: 3 },
    { url: "https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif", preco: 3 },
  ],
  boaNoite: [
    { url: "https://media.giphy.com/media/l0HlHJGHe3yAMhdQY/giphy.gif", preco: 1 },
    { url: "https://media.giphy.com/media/3o7absbD7PbTFQa0c8/giphy.gif", preco: 1 },
    { url: "https://media.giphy.com/media/l0MYC0LajbaPoEADu/giphy.gif", preco: 2 },
    { url: "https://media.giphy.com/media/3o6Zt6ML6BklcajjsA/giphy.gif", preco: 2 },
    { url: "https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif", preco: 3 },
    { url: "https://media.giphy.com/media/3o6ZsZdNs3yE5l6hWM/giphy.gif", preco: 3 },
  ],
}

// Vídeos de IA com preview e preços
const VIDEOS_IA = [
  {
    id: 1,
    titulo: "Paisagem Futurista",
    descricao: "Cidade cyberpunk com neon e chuva",
    preview: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=300&fit=crop",
    preco: 15,
    duracao: "30s",
    categoria: "Sci-Fi"
  },
  {
    id: 2,
    titulo: "Natureza Mágica",
    descricao: "Floresta encantada com criaturas místicas",
    preview: "https://images.unsplash.com/photo-1511497584788-876760111969?w=400&h=300&fit=crop",
    preco: 12,
    duracao: "25s",
    categoria: "Fantasia"
  },
  {
    id: 3,
    titulo: "Oceano Profundo",
    descricao: "Vida marinha em 4K ultra realista",
    preview: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
    preco: 10,
    duracao: "20s",
    categoria: "Natureza"
  },
  {
    id: 4,
    titulo: "Espaço Sideral",
    descricao: "Galáxias e nebulosas em movimento",
    preview: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=300&fit=crop",
    preco: 18,
    duracao: "35s",
    categoria: "Espaço"
  },
  {
    id: 5,
    titulo: "Animais Fantásticos",
    descricao: "Criaturas híbridas em seu habitat",
    preview: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400&h=300&fit=crop",
    preco: 14,
    duracao: "28s",
    categoria: "Fantasia"
  },
  {
    id: 6,
    titulo: "Cidade Noturna",
    descricao: "Metrópole iluminada em timelapse",
    preview: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=300&fit=crop",
    preco: 11,
    duracao: "22s",
    categoria: "Urbano"
  },
]

// Missões diárias para ganhar moedas
const MISSOES = [
  { id: "compartilhar3", titulo: "Compartilhe 3 GIFs", recompensa: 2, meta: 3, tipo: "compartilhar" },
  { id: "compartilhar5", titulo: "Compartilhe 5 GIFs", recompensa: 5, meta: 5, tipo: "compartilhar" },
  { id: "compartilhar10", titulo: "Compartilhe 10 GIFs", recompensa: 10, meta: 10, tipo: "compartilhar" },
  { id: "diario", titulo: "Use o app por 3 dias seguidos", recompensa: 15, meta: 3, tipo: "diario" },
  { id: "todas_categorias", titulo: "Compartilhe em todas as categorias", recompensa: 8, meta: 3, tipo: "categorias" },
  { id: "comprar_video", titulo: "Compre seu primeiro vídeo de IA", recompensa: 20, meta: 1, tipo: "video" },
  { id: "indicar3", titulo: "Indique 3 companheiros", recompensa: 100, meta: 3, tipo: "indicacao" },
]

// Sistema de níveis (esquema pirâmide)
const NIVEIS = [
  { nome: "Iniciante", min: 0, max: 4, cor: "bg-gray-500", emoji: "🌱" },
  { nome: "Amigo", min: 5, max: 14, cor: "bg-blue-500", emoji: "👋" },
  { nome: "Família", min: 15, max: 29, cor: "bg-green-500", emoji: "❤️" },
  { nome: "Influencer", min: 30, max: 49, cor: "bg-purple-500", emoji: "⭐" },
  { nome: "Lenda", min: 50, max: 99, cor: "bg-orange-500", emoji: "🔥" },
  { nome: "Mestre dos GIFs", min: 100, max: Infinity, cor: "bg-gradient-to-r from-yellow-400 to-pink-500", emoji: "👑" },
]

export default function Home() {
  const [compartilhamentos, setCompartilhamentos] = useState(0)
  const [moedas, setMoedas] = useState(CREDITOS_INICIAIS)
  const [activeTab, setActiveTab] = useState("bomDia")
  const [showConfetti, setShowConfetti] = useState(false)
  const [missoesCompletas, setMissoesCompletas] = useState<string[]>([])
  const [compartilhamentosDia, setCompartilhamentosDia] = useState(0)
  const [categoriasUsadas, setCategoriasUsadas] = useState<Set<string>>(new Set())
  const [showMissoes, setShowMissoes] = useState(false)
  const [videosComprados, setVideosComprados] = useState<number[]>([])
  const [indicacoes, setIndicacoes] = useState(0)
  const [showIndicacao, setShowIndicacao] = useState(false)

  // Carregar dados do localStorage
  useEffect(() => {
    const savedCompartilhamentos = localStorage.getItem("compartilhamentos")
    const savedMoedas = localStorage.getItem("moedas")
    const savedMissoes = localStorage.getItem("missoesCompletas")
    const savedCompartilhamentosDia = localStorage.getItem("compartilhamentosDia")
    const savedCategorias = localStorage.getItem("categoriasUsadas")
    const savedVideos = localStorage.getItem("videosComprados")
    const savedIndicacoes = localStorage.getItem("indicacoes")
    
    if (savedCompartilhamentos) setCompartilhamentos(parseInt(savedCompartilhamentos))
    if (savedMoedas) setMoedas(parseInt(savedMoedas))
    if (savedMissoes) setMissoesCompletas(JSON.parse(savedMissoes))
    if (savedCompartilhamentosDia) setCompartilhamentosDia(parseInt(savedCompartilhamentosDia))
    if (savedCategorias) setCategoriasUsadas(new Set(JSON.parse(savedCategorias)))
    if (savedVideos) setVideosComprados(JSON.parse(savedVideos))
    if (savedIndicacoes) setIndicacoes(parseInt(savedIndicacoes))
  }, [])

  // Salvar dados no localStorage
  useEffect(() => {
    localStorage.setItem("compartilhamentos", compartilhamentos.toString())
    localStorage.setItem("moedas", moedas.toString())
    localStorage.setItem("missoesCompletas", JSON.stringify(missoesCompletas))
    localStorage.setItem("compartilhamentosDia", compartilhamentosDia.toString())
    localStorage.setItem("categoriasUsadas", JSON.stringify(Array.from(categoriasUsadas)))
    localStorage.setItem("videosComprados", JSON.stringify(videosComprados))
    localStorage.setItem("indicacoes", indicacoes.toString())
  }, [compartilhamentos, moedas, missoesCompletas, compartilhamentosDia, categoriasUsadas, videosComprados, indicacoes])

  // Calcular nível atual
  const nivelAtual = NIVEIS.find(
    (n) => compartilhamentos >= n.min && compartilhamentos <= n.max
  ) || NIVEIS[0]

  const proximoNivel = NIVEIS.find((n) => n.min > compartilhamentos)
  const progresso = proximoNivel
    ? ((compartilhamentos - nivelAtual.min) / (proximoNivel.min - nivelAtual.min)) * 100
    : 100

  // Verificar e completar missões
  const verificarMissoes = (novoCompartilhamentos: number, categoria: string, tipo?: string) => {
    const novasCategorias = new Set(categoriasUsadas)
    if (categoria) novasCategorias.add(categoria)
    setCategoriasUsadas(novasCategorias)

    MISSOES.forEach((missao) => {
      if (missoesCompletas.includes(missao.id)) return

      let completa = false

      if (missao.tipo === "compartilhar" && novoCompartilhamentos >= missao.meta) {
        completa = true
      } else if (missao.tipo === "categorias" && novasCategorias.size >= missao.meta) {
        completa = true
      } else if (missao.tipo === "video" && tipo === "video" && videosComprados.length >= missao.meta) {
        completa = true
      } else if (missao.tipo === "indicacao" && indicacoes >= missao.meta) {
        completa = true
      }

      if (completa) {
        setMissoesCompletas([...missoesCompletas, missao.id])
        setMoedas(moedas + missao.recompensa)
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 3000)
      }
    })
  }

  const handleCompartilhar = async (gifUrl: string, preco: number, categoria: string) => {
    // Verificar se tem moedas suficientes
    if (moedas < preco) {
      alert(`Você precisa de ${preco} moedas para compartilhar este GIF! Complete missões para ganhar mais moedas.`)
      return
    }

    // Simular compartilhamento
    if (navigator.share) {
      try {
        await navigator.share({
          title: categoria === "bomDia" ? "Bom Dia!" : categoria === "boaTarde" ? "Boa Tarde!" : "Boa Noite!",
          text: "Olha que lindo! 💖",
          url: gifUrl,
        })
      } catch (err) {
        console.log("Compartilhamento cancelado")
        return
      }
    }

    // Descontar moedas
    setMoedas(moedas - preco)

    // Incrementar contadores
    const novoTotal = compartilhamentos + 1
    const novoDia = compartilhamentosDia + 1
    setCompartilhamentos(novoTotal)
    setCompartilhamentosDia(novoDia)

    // Verificar missões
    verificarMissoes(novoDia, categoria)

    // Verificar se subiu de nível
    const novoNivel = NIVEIS.find(
      (n) => novoTotal >= n.min && novoTotal <= n.max
    )
    if (novoNivel && novoNivel.nome !== nivelAtual.nome) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
    }
  }

  const handleComprarVideo = (videoId: number, preco: number) => {
    if (moedas < preco) {
      alert(`Você precisa de ${preco} moedas para comprar este vídeo! Complete missões para ganhar mais moedas.`)
      return
    }

    // Descontar moedas
    setMoedas(moedas - preco)

    // Adicionar vídeo aos comprados
    const novosVideos = [...videosComprados, videoId]
    setVideosComprados(novosVideos)

    // Verificar missão de compra de vídeo
    verificarMissoes(compartilhamentosDia, "", "video")

    // Mostrar confetti
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)

    alert("🎉 Vídeo comprado com sucesso! Agora você pode assistir quando quiser!")
  }

  const handleIndicarCompanheiro = () => {
    // Simular indicação
    const novasIndicacoes = indicacoes + 1
    setIndicacoes(novasIndicacoes)

    // A cada 3 indicações, ganha 100 moedas
    if (novasIndicacoes % 3 === 0) {
      setMoedas(moedas + 100)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
      alert("🎉 Parabéns! Você indicou 3 companheiros e ganhou 100 moedas!")
    } else {
      alert(`✅ Indicação registrada! Faltam ${3 - (novasIndicacoes % 3)} indicações para ganhar 100 moedas!`)
    }

    // Verificar missão de indicação
    verificarMissoes(compartilhamentosDia, "")

    setShowIndicacao(false)
  }

  const copiarLinkIndicacao = () => {
    const link = `https://gifsdefamilia.app/ref/${Math.random().toString(36).substring(7)}`
    navigator.clipboard.writeText(link)
    alert("🔗 Link de indicação copiado! Compartilhe com seus amigos!")
  }

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case "bomDia":
        return <Sun className="w-4 h-4" />
      case "boaTarde":
        return <Sunset className="w-4 h-4" />
      case "boaNoite":
        return <Moon className="w-4 h-4" />
      case "videosIA":
        return <Video className="w-4 h-4" />
      default:
        return null
    }
  }

  const calcularProgressoMissao = (missao: typeof MISSOES[0]) => {
    if (missao.tipo === "compartilhar") {
      return Math.min((compartilhamentosDia / missao.meta) * 100, 100)
    } else if (missao.tipo === "categorias") {
      return Math.min((categoriasUsadas.size / missao.meta) * 100, 100)
    } else if (missao.tipo === "video") {
      return Math.min((videosComprados.length / missao.meta) * 100, 100)
    } else if (missao.tipo === "indicacao") {
      return Math.min((indicacoes / missao.meta) * 100, 100)
    }
    return 0
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 p-4 sm:p-6 md:p-8">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="text-6xl animate-bounce">🎉</div>
        </div>
      )}

      {/* Modal de Indicação */}
      {showIndicacao && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full p-6 bg-white dark:bg-gray-800">
            <div className="text-center mb-4">
              <Users className="w-16 h-16 mx-auto text-purple-500 mb-3" />
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                Indique um Companheiro
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                A cada 3 indicações você ganha <span className="font-bold text-yellow-500">+100 moedas</span>!
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Progresso de Indicações
                </span>
                <Badge className="bg-purple-500 text-white">
                  {indicacoes % 3}/3
                </Badge>
              </div>
              <Progress value={(indicacoes % 3) * 33.33} className="h-3" />
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                Total de indicações: {indicacoes}
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={copiarLinkIndicacao}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Copiar Link de Indicação
              </Button>

              <Button
                onClick={handleIndicarCompanheiro}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Registrar Indicação Manual
              </Button>

              <Button
                onClick={() => setShowIndicacao(false)}
                variant="outline"
                className="w-full"
              >
                Fechar
              </Button>
            </div>
          </Card>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-8 h-8 text-yellow-500" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              GIFs da Família
            </h1>
            <Sparkles className="w-8 h-8 text-yellow-500" />
          </div>
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300">
            Compartilhe amor e alegria todos os dias! 💖
          </p>
          <div className="mt-3 flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Gift className="w-4 h-4" />
            <span>App: R$ {PRECO_APP.toFixed(2)} • Inclui {CREDITOS_INICIAIS} moedas grátis!</span>
          </div>
        </div>

        {/* Card de Moedas e Nível */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Moedas */}
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 backdrop-blur-sm border-2 border-yellow-300 dark:border-yellow-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-500 p-3 rounded-full">
                  <Coins className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">Suas Moedas</h3>
                  <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{moedas}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  onClick={() => setShowMissoes(!showMissoes)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  Missões
                </Button>
                <Button
                  onClick={() => setShowIndicacao(true)}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Indicar
                </Button>
              </div>
            </div>
          </Card>

          {/* Nível */}
          <Card className="p-4 sm:p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-purple-200 dark:border-purple-700">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="text-4xl">{nivelAtual.emoji}</div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                      {nivelAtual.nome}
                    </h2>
                    <Badge className={`${nivelAtual.cor} text-white`}>
                      Nível {NIVEIS.indexOf(nivelAtual) + 1}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {compartilhamentos} compartilhamentos
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  {proximoNivel ? `Próximo: ${proximoNivel.nome}` : "Nível Máximo!"}
                </p>
                <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                    style={{ width: `${progresso}%` }}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Painel de Missões */}
        {showMissoes && (
          <Card className="mb-6 p-4 sm:p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-300 dark:border-purple-700">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Missões Diárias</h3>
            </div>
            <div className="space-y-3">
              {MISSOES.map((missao) => {
                const completa = missoesCompletas.includes(missao.id)
                const progresso = calcularProgressoMissao(missao)

                return (
                  <div
                    key={missao.id}
                    className={`p-4 rounded-lg border-2 ${
                      completa
                        ? "bg-green-100 dark:bg-green-900/20 border-green-400"
                        : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {completa ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                          <Lock className="w-5 h-5 text-gray-400" />
                        )}
                        <span className="font-semibold text-gray-800 dark:text-white">
                          {missao.titulo}
                        </span>
                      </div>
                      <Badge className="bg-yellow-500 text-white">
                        +{missao.recompensa} <Coins className="w-3 h-3 ml-1 inline" />
                      </Badge>
                    </div>
                    {!completa && (
                      <Progress value={progresso} className="h-2" />
                    )}
                  </div>
                )
              })}
            </div>
          </Card>
        )}

        {/* Tabs de Categorias */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-1">
            <TabsTrigger
              value="bomDia"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-orange-400 data-[state=active]:text-white"
            >
              {getTabIcon("bomDia")}
              <span className="hidden sm:inline">Bom Dia</span>
              <span className="sm:hidden">Dia</span>
            </TabsTrigger>
            <TabsTrigger
              value="boaTarde"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-400 data-[state=active]:to-pink-400 data-[state=active]:text-white"
            >
              {getTabIcon("boaTarde")}
              <span className="hidden sm:inline">Boa Tarde</span>
              <span className="sm:hidden">Tarde</span>
            </TabsTrigger>
            <TabsTrigger
              value="boaNoite"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
            >
              {getTabIcon("boaNoite")}
              <span className="hidden sm:inline">Boa Noite</span>
              <span className="sm:hidden">Noite</span>
            </TabsTrigger>
            <TabsTrigger
              value="videosIA"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white"
            >
              {getTabIcon("videosIA")}
              <span className="hidden sm:inline">Vídeos IA</span>
              <span className="sm:hidden">IA</span>
            </TabsTrigger>
          </TabsList>

          {/* Grid de GIFs - Bom Dia */}
          <TabsContent value="bomDia">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {GIFS.bomDia.map((gif, index) => (
                <Card
                  key={index}
                  className="overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                >
                  <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20">
                    <img
                      src={gif.url}
                      alt={`Bom Dia ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-yellow-500 text-white font-bold">
                        {gif.preco} <Coins className="w-3 h-3 ml-1 inline" />
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                  </div>
                  <div className="p-3">
                    <Button
                      onClick={() => handleCompartilhar(gif.url, gif.preco, "bomDia")}
                      disabled={moedas < gif.preco}
                      className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      {moedas < gif.preco ? "Sem moedas" : "Compartilhar"}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Grid de GIFs - Boa Tarde */}
          <TabsContent value="boaTarde">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {GIFS.boaTarde.map((gif, index) => (
                <Card
                  key={index}
                  className="overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                >
                  <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-orange-100 to-pink-100 dark:from-orange-900/20 dark:to-pink-900/20">
                    <img
                      src={gif.url}
                      alt={`Boa Tarde ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-orange-500 text-white font-bold">
                        {gif.preco} <Coins className="w-3 h-3 ml-1 inline" />
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                  </div>
                  <div className="p-3">
                    <Button
                      onClick={() => handleCompartilhar(gif.url, gif.preco, "boaTarde")}
                      disabled={moedas < gif.preco}
                      className="w-full bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      {moedas < gif.preco ? "Sem moedas" : "Compartilhar"}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Grid de GIFs - Boa Noite */}
          <TabsContent value="boaNoite">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {GIFS.boaNoite.map((gif, index) => (
                <Card
                  key={index}
                  className="overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                >
                  <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20">
                    <img
                      src={gif.url}
                      alt={`Boa Noite ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-purple-500 text-white font-bold">
                        {gif.preco} <Coins className="w-3 h-3 ml-1 inline" />
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                  </div>
                  <div className="p-3">
                    <Button
                      onClick={() => handleCompartilhar(gif.url, gif.preco, "boaNoite")}
                      disabled={moedas < gif.preco}
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      {moedas < gif.preco ? "Sem moedas" : "Compartilhar"}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Grid de Vídeos de IA */}
          <TabsContent value="videosIA">
            <div className="mb-6">
              <Card className="p-4 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border-2 border-cyan-300 dark:border-cyan-700">
                <div className="flex items-center gap-3">
                  <Video className="w-6 h-6 text-cyan-500" />
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-white">Vídeos Gerados por IA</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Vídeos exclusivos criados por inteligência artificial. Compre para desbloquear!
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {VIDEOS_IA.map((video) => {
                const comprado = videosComprados.includes(video.id)
                
                return (
                  <Card
                    key={video.id}
                    className="overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                  >
                    <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/20 dark:to-blue-900/20">
                      {/* Preview com blur se não comprado */}
                      <div className={`w-full h-full ${!comprado ? 'blur-md' : ''}`}>
                        <img
                          src={video.preview}
                          alt={video.titulo}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Overlay de bloqueio */}
                      {!comprado && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <div className="text-center">
                            <Lock className="w-12 h-12 text-white mx-auto mb-2" />
                            <p className="text-white font-bold text-sm">Compre para assistir</p>
                          </div>
                        </div>
                      )}

                      {/* Badge de preço ou comprado */}
                      <div className="absolute top-2 right-2">
                        {comprado ? (
                          <Badge className="bg-green-500 text-white font-bold">
                            <CheckCircle2 className="w-3 h-3 mr-1 inline" />
                            Comprado
                          </Badge>
                        ) : (
                          <Badge className="bg-cyan-500 text-white font-bold">
                            {video.preco} <Coins className="w-3 h-3 ml-1 inline" />
                          </Badge>
                        )}
                      </div>

                      {/* Badge de categoria */}
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-black/70 text-white text-xs">
                          {video.categoria}
                        </Badge>
                      </div>

                      {/* Badge de duração */}
                      <div className="absolute bottom-2 left-2">
                        <Badge className="bg-black/70 text-white text-xs">
                          {video.duracao}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-4">
                      <h4 className="font-bold text-gray-800 dark:text-white mb-1">
                        {video.titulo}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {video.descricao}
                      </p>

                      {comprado ? (
                        <Button
                          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Assistir Agora
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleComprarVideo(video.id, video.preco)}
                          disabled={moedas < video.preco}
                          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          {moedas < video.preco ? "Sem moedas" : `Comprar por ${video.preco}`}
                        </Button>
                      )}
                    </div>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer com Dica */}
        <div className="mt-8 text-center">
          <Card className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-300 dark:border-purple-700">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              💡 <strong>Dica:</strong> Indique 3 amigos e ganhe 100 moedas! Complete missões para desbloquear vídeos incríveis de IA! 🚀
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
