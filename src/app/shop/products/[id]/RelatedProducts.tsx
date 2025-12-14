"use client"

const relatedProducts = [
  { id: 2, title: "Portable Speaker", price: 79.99 },
  { id: 3, title: "USB-C Cable", price: 19.99 },
  { id: 4, title: "Carrying Case", price: 34.99 },
];

const RelatedProducts: React.FC = () => {
  return (
    <div className="mt-4 py-4 space-y-4 border-y border-muted">
      <h3 className="text-lg font-heading font-semibold text-primary">Related Products</h3>
      <div className="space-y-3">
        {relatedProducts.map((product) => (
          <div
            key={product.id}
            className="p-4 border border-muted rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
          >
            <p className="font-heading font-semibold text-foreground text-sm">{product.title}</p>
            <p className="text-accent font-semibold mt-1">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts