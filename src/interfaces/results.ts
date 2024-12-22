export interface Relatorio {
	imagem_processada: Base64URLString;
	relatorio: {
		medidas_estruturais: MedidasEstruturais;
		analise_setorial: AnaliseSetorial[];
		analise_collarette: AnaliseCollarette;
		interpretacao: Interpretacao;
	};
}

export interface MedidasEstruturais {
	pupila: Pupila;
	iris: Iris;
}

export interface Pupila {
	centro: number[];
	raio: number;
}

export interface Iris {
	centro: number[];
	raio: number;
}

export interface AnaliseSetorial {
	setor: number;
	contraste: number;
	homogeneidade: number;
	observacoes: string[];
}

export interface AnaliseCollarette {
	regularidade: number;
	circularidade: number;
}

export interface Interpretacao {
	pupila: string;
	forma_pupilar: string;
	iris: string;
	textura: string;
	collarette: string;
	estrutura: string;
}
