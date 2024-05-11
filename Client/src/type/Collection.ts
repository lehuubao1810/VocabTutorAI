export interface VocabularyItem {
	word: string;
	translation: string;
	mean: string;
	pronunciation: string;
	example: string;
}

export interface CollectionItemData {
	collectionID: string;
	name: string;
	desc: string;
	value: number;
	date: string;
	vocabulary: VocabularyItem[];
}
