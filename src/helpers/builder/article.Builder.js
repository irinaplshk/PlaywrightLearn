import { fakerRU as faker } from '@faker-js/faker';

export class ArticleBuilder {
    constructor() {
        this.articleData = {}; // Хранит только те свойства, которые были добавлены
    }


    addArticleTitle() {
        this.articleData.ArticleTitle = faker.book.title()+ faker.book.author();
        return this;
    }
    addDescribeArticle() {
           this.articleData.DescribeArticle = faker.book.publisher();
        return this;
    }
    addArticle() {
        this.articleData.Article = faker.book.author();
        return this;
    }
    addComment() {
        this.articleData.Comment = faker.book.format();
        return this;
    }
    addTag() {
        this.articleData.Tag = faker.book.author();
        return this;
    }
    generate() {
        return this.articleData;
    }
}