'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import MainLayout from '@/components/layout/MainLayout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Plus, Search, Users, UserPlus, MoreVertical, Share2, Eye, Pencil, Trash
} from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Modal } from '@/components/ui/modal'
import { CreateGroupForm } from '@/components/forms/CreateGroupForm'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export default function GroupsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [groups, setGroups] = useState<any[]>([])
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false)
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null)
  const [users, setUsers] = useState<any[]>([])
  const [isPartilhaModalOpen, setIsPartilhaModalOpen] = useState(false)
  const [partilhas, setPartilhas] = useState<any[]>([])
  const [novaPartilhaNome, setNovaPartilhaNome] = useState('')
  const [parsedUserId, setParsedUserId] = useState<number | null>(null)
  const [selectedPartilha, setSelectedPartilha] = useState<any | null>(null)
  const [isViewPartilhaModalOpen, setIsViewPartilhaModalOpen] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const user = JSON.parse(storedUser)
      setParsedUserId(user.id)
    }
  }, [])

  useEffect(() => {
    axios.get(`${BASE_URL}/api/GrupoDeAmigos`).then(res => setGroups(res.data))
    axios.get(`${BASE_URL}/api/ListasPartilha`).then(res => setPartilhas(res.data))
  }, [])

  const handleCreateGroup = async (groupName: string) => {
    const formData = new FormData()
    formData.append('NomeDoGrupo', groupName)
    formData.append('UtilizadorId', String(parsedUserId || ''))

    try {
      const res = await axios.post(`${BASE_URL}/api/GrupoDeAmigos`, formData)
      setGroups([...groups, res.data])
      setIsCreateModalOpen(false)
    } catch (err) {
      console.error('Erro ao criar grupo:', err)
    }
  }

  const openAddMemberModal = async (groupId: number) => {
    setSelectedGroupId(groupId)
    setIsAddMemberModalOpen(true)
    try {
      const res = await axios.get(`${BASE_URL}/api/Utilizador`)
      setUsers(res.data)
    } catch (err) {
      console.error('Erro ao buscar utilizadores:', err)
    }
  }

  const handleAddMember = async (utilizadorId: number) => {
    if (!selectedGroupId) return

    const payload = {
      grupoDeAmigosId: selectedGroupId,
      utilizadorId: utilizadorId
    }

    try {
      await axios.post(`${BASE_URL}/api/MembroGrupo`, payload)
      alert('Membro adicionado com sucesso!')
      setIsAddMemberModalOpen(false)
    } catch (err) {
      console.error('Erro ao adicionar membro:', err)
    }
  }

  const handleCreatePartilha = async () => {
    if (!novaPartilhaNome) return

    const payload = {
      nomeDaLista: novaPartilhaNome,
      utilizadorId: parsedUserId
    }

    try {
      const res = await axios.post(`${BASE_URL}/api/ListasPartilha`, payload)
      setPartilhas([...partilhas, res.data])
      setNovaPartilhaNome('')
      setIsPartilhaModalOpen(false)
    } catch (err) {
      console.error('Erro ao criar lista de partilha:', err)
    }
  }

  const openPartilhaDetails = (partilha: any) => {
    setSelectedPartilha(partilha)
    setIsViewPartilhaModalOpen(true)
  }

  return (
    <MainLayout>
      <Navbar />
      <div className="space-y-6 pt-20 px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Grupos</h1>
          <Button onClick={() => setIsCreateModalOpen(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Novo Grupo
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Buscar grupos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.filter(group =>
            group.nomeDoGrupo.toLowerCase().includes(searchQuery.toLowerCase())
          ).map((group) => (
            <Card key={group.id} className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{group.nomeDoGrupo}</h3>
                  <p className="text-sm text-gray-500">Criado por {group.nomeDono}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" /> {group.totalMembros || 0} membros
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => openAddMemberModal(group.id)}>
                    <UserPlus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Listas de Partilha</h2>
            <Button onClick={() => setIsPartilhaModalOpen(true)} className="flex items-center gap-2">
              <Share2 className="w-4 h-4" /> Nova Lista
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partilhas.map(partilha => (
              <Card key={partilha.id} className="p-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-purple-700">{partilha.nomeDaLista}</h3>
                  <p className="text-sm text-gray-600">Criado por <span className="font-medium">{partilha.nomeUtilizador}</span></p>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  <Button size="sm" variant="ghost" onClick={() => openPartilhaDetails(partilha)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Trash className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Modal criar grupo */}
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Criar Novo Grupo">
        <CreateGroupForm onSubmit={handleCreateGroup} onCancel={() => setIsCreateModalOpen(false)} />
      </Modal>

      {/* Modal adicionar membro */}
      <Modal isOpen={isAddMemberModalOpen} onClose={() => setIsAddMemberModalOpen(false)} title="Adicionar Membro">
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {users.map(user => (
            <div key={user.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{user.username}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <Button onClick={() => handleAddMember(user.id)} size="sm">Adicionar</Button>
            </div>
          ))}
        </div>
      </Modal>

      {/* Modal criar lista de partilha */}
      <Modal isOpen={isPartilhaModalOpen} onClose={() => setIsPartilhaModalOpen(false)} title="Nova Lista de Partilha">
        <div className="space-y-4">
          <Input placeholder="Nome da Lista" value={novaPartilhaNome} onChange={(e) => setNovaPartilhaNome(e.target.value)} />
          <Button onClick={handleCreatePartilha} className="w-full">Criar</Button>
        </div>
      </Modal>

      {/* Modal visualizar lista de partilha */}
      <Modal isOpen={isViewPartilhaModalOpen} onClose={() => setIsViewPartilhaModalOpen(false)} title="Detalhes da Lista de Partilha">
        {selectedPartilha && (
          <div className="space-y-2">
            
            <p><strong>Nome da Lista:</strong> {selectedPartilha.nomeDaLista}</p>
            <p><strong>Utilizador:</strong> {selectedPartilha.nomeUtilizador}</p>
            <p><strong>Data de Criação:</strong> {new Date(selectedPartilha.dataDeCriacao).toLocaleString()}</p>
          </div>
        )}
      </Modal>
    </MainLayout>
  )
}
