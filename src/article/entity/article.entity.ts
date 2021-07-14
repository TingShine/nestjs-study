import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'

@Entity("article")
export class Article {
    @PrimaryGeneratedColumn()
    articleId: number

    @Column({ type: "varchar", nullable: false })
    title: string

  
}