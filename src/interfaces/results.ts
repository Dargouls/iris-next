export interface ResultIrisProps {
	informacoes_imagem: InformacoesImagem;
	medidas_estruturais: MedidasEstruturais;
	interpretacao: Interpretacao;
	imagem_processada: any;
}

export interface InformacoesImagem {
	formato: string;
	dimensoes: string;
}

export interface MedidasEstruturais {
	pupila: Pupila;
	iris: Iris;
	collarette: Collarette;
}

export interface Pupila {
	raio: string;
	tamanho_relativo: string;
	forma: string;
}

export interface Iris {
	raio: string;
	densidade: string;
	textura: string;
}

export interface Collarette {
	regularidade: string;
	circularidade: string;
}

export interface Interpretacao {
	pupila: string;
	iris: string;
	collarette: string;
}
