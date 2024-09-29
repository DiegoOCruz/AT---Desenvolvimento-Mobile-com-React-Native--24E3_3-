export interface ItemIterface {
    uid: string;
    title: string;
    description: string;
    images?: Array<string>;
    createdAt?: string;
    sync?: number;
    solicitante?: string;
    email?: string;
}

export interface ItemImageInterface {
    uid: string;
    image: string;
    itemUid: string;
    createdAt?: string;
    sync?: number;
}

export interface Requisicao {
    id: string;
    produto: string;
    quantidade: string;
    data: string;
    prioridade: string;
    observacoes: string;
    status: string;
  }
  
export interface RequisicaoDeCompra {
    
    produto: string;
    quantidade: string;
    data: string;
    prioridade: string;
    observacoes: string;
    status: string;
    solicitante: object;
  }
  