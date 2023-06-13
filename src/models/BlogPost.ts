import { BlogCategory } from "./BlogCategory";
import { File } from "./File";
import { Network } from "./Network";
import { Tag } from "./Tag";

export interface BlogPost {
    id?: number;
    title: string;
    slug: string;
    content: string;
    short_description: string;
    user_id: string | number | null;
    id_network: string | number | null;
    id_category: string | number | null;
    id_file: string | number | null;
    file?: File;
    network?: Network;
    category?: BlogCategory;
    tags?: Tag[];
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}
