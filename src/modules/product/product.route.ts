import { Router, type Router as ExpressRouter } from 'express';
import { ProductController } from './product.controller.js';

const router: ExpressRouter = Router();

// Create product
router.post('/', ProductController.createProduct);

// Get all products (filters: category, status, featured, search)
router.get('/', ProductController.getAllProducts);

// ✅ SPECIFIC ROUTES - MUST come before dynamic routes
router.get('/featured', ProductController.getFeaturedProducts);
router.get('/category/:category', ProductController.getProductsByCategory);

// ⚠️ Dynamic route - should be LAST in GET routes
router.get('/:identifier', ProductController.getProduct);

// Update product
router.patch('/:id', ProductController.updateProduct);

// Delete product
router.delete('/:id', ProductController.deleteProduct);

// Update stock
router.patch('/:id/stock', ProductController.updateStock);

// Update product status
router.patch('/:id/status', ProductController.updateProductStatus);

export const ProductRoutes = router;
