namespace JewelryShopApp.Models
{
    public class JewelryItem
    {
        public int id { get; set; }
        public string name { get; set; }

        public double discount { get; set; }
        public string type { get; set; }
        public string metal { get; set; }
        public string gemstones { get; set; }
        public double weight { get; set; }
        public decimal costPrice { get; set; }
        public decimal sellingPrice { get; set; }
        public int stockQuantity { get; set; }
        public string? jewelryPicture { get; set; }
        public Category category { get; set; }
    }

}
