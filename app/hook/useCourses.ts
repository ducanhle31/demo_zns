// data.ts

export interface SubCategory {
    id: number;
    name: string;
  }
  
  export interface Category {
    id: number;
    name: string;
    subCategories: SubCategory[];
  }
  
  export const categories: Category[] = [
    {
      id: 1,
      name: 'Y học cổ truyền  ',
      subCategories: [
        { id: 1, name: 'Cải thiện sức khỏe ' },
        { id: 2, name: 'Giảm mỏi mắt, ' },
        { id: 3, name: 'Kiểm soát stress' },
      ],
    },
    {
      id: 2,
      name: 'Y học cổ đại',
      subCategories: [
        { id: 4, name: 'Y học ' },
        { id: 5, name: 'Chuyên Khoa ' },
        { id: 6, name: 'Học đương đại' },
      ],
    },
    {
      id: 3,
      name: 'Y học truyền ',
      subCategories: [
        { id: 7, name: 'Truyền năng lượng' },
        { id: 8, name: 'Momen' },
        { id: 9, name: 'Năng lượng' },
      ],
    },
  ];
  