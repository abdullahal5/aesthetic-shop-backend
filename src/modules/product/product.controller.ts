import type { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync.js';
import httpStatus from 'http-status';
import sendResponse from '../../utils/responseHandler.js';
import * as ProductService from './product.service.js';
import type { IProduct } from './product.types.js';

export class ProductController {
  // Create product
  static createProduct = catchAsync(async (req: Request, res: Response) => {
    const productData: IProduct = req.body;
    const result = await ProductService.createProduct(productData);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Product created successfully',
      data: result,
    });
  });

  // Get all products
  static getAllProducts = catchAsync(async (req: Request, res: Response) => {
    const { category, status, featured, search } = req.query;

    const filters = {
      ...(category && { category: category as string }),
      ...(status && { status: status as string }),
      ...(search && { search: search as string }),
      ...(featured === 'true' && { featured: true }),
      ...(featured === 'false' && { featured: false }),
    };

    const result = await ProductService.getAllProducts(filters);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Products retrieved successfully',
      data: result,
    });
  });

  // Get single product
  static getProduct = catchAsync(async (req: Request, res: Response) => {
    const { identifier } = req.params;
    const result = await ProductService.getProductById(identifier as string);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product retrieved successfully',
      data: result,
    });
  });

  // Add these methods to your existing ProductController class

  static getFeaturedProducts = catchAsync(
    async (req: Request, res: Response) => {
      const limit = req.query.limit
        ? parseInt(req.query.limit as string)
        : undefined;
      const result = await ProductService.getFeaturedProducts(limit);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Featured products retrieved successfully',
        data: result,
      });
    },
  );

  static getProductsByCategory = catchAsync(
    async (req: Request, res: Response) => {
      const { category } = req.params;
      const result = await ProductService.getProductsByCategory(category as string);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Products retrieved successfully',
        data: result,
      });
    },
  );

  // Update product
  static updateProduct = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData: Partial<IProduct> = req.body;
    const result = await ProductService.updateProduct(id as string, updateData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product updated successfully',
      data: result,
    });
  });

  // Delete product
  static deleteProduct = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await ProductService.deleteProduct(id as string);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product deleted successfully',
      data: null,
    });
  });

  // Update stock
  static updateStock = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { quantity, operation } = req.body;

    if (!quantity || !operation) {
      return sendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: 'Quantity and operation are required',
        data: null,
      });
    }

    if (!['increase', 'decrease'].includes(operation)) {
      return sendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: 'Operation must be either "increase" or "decrease"',
        data: null,
      });
    }

    const result = await ProductService.updateStock(
      id as string,
      quantity,
      operation,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Stock updated successfully',
      data: result,
    });
  });

  // Update product status
  static updateProductStatus = catchAsync(
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const { status } = req.body;

      if (!status || !['active', 'draft', 'archived'].includes(status)) {
        return sendResponse(res, {
          statusCode: httpStatus.BAD_REQUEST,
          success: false,
          message: 'Valid status (active, draft, archived) is required',
          data: null,
        });
      }

      const result = await ProductService.updateProductStatus(
        id as string,
        status,
      );

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Product status updated successfully',
        data: result,
      });
    },
  );
}
