export interface VocabularyItem {
	id: string;
	word: string;
	translation: string;
	mean: string;
	pronunciation: string;
	example: string;
}

export interface CollectionItemData {
	id: string;
	name: string;
	desc: string;
	value: number;
	date: string;
	vocabulary: VocabularyItem[];
}
