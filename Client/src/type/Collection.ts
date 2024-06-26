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
	isAdmin: boolean;
	isPublish: boolean;
	uid: string | "";
	vocabulary: VocabularyItem[];
}

export interface CollectionListItemData {
	id: string;
	name: string;
	desc: string;
	value: number;
	isAdmin: boolean;
	isPublish: boolean;
	uid: string | "";
	vocabulary: string[];
}

export interface CollectionItemDelete {
	id: string;
	vocabulary: string[]
}

export interface CollectionItemUpload {
	name: string;
	desc: string;
	value: number;
	isAdmin: boolean;
	isPublish: boolean;
	uid: string | "";
	vocabulary: VocabularyItem[];
}

export interface VocabularyItemUpload {
	word: string;
	translation: string;
	mean: string;
	pronunciation: string;
	example: string;
}