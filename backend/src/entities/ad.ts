import { BaseEntity, Column, Entity, ManyToOne, ManyToMany, JoinTable, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { Category } from "./category";
import { Tag } from "./tag";


@Entity()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  owner: string;

  @Column()
  price: number;

  @CreateDateColumn()
  createdAt?: string;

  @Column()
  location: string;

  @Column()
  imageUrl: string;

 // an ad has only 1 category
  // a category can contain multiple ads
  // Many to One relationship (many ads one category)
  @ManyToOne(() => Category, (category) => category.ads)
  category: Category;


  @JoinTable()
  @ManyToMany(() => Tag, (tag) => tag.ads)
  tags: Tag[];
}