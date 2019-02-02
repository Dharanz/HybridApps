export interface Products {
    id?: String;
    name?: String;
    colorID?: Number;
    color?: String;
    brand?: String;
    sizeID?: Number;
    size?: String;
    prize?: Number;
    quantity?: Number;
    images?: String;
    CategoryID?: Number;
    CategoryName?: String;
}

export interface ProductColor {
    id?: String;
    name?: String;
}

export interface ProductSize {
    id?: String;
    size?: String;
}

export interface ProductCategory {
    id?: String;
    category?: String;
}