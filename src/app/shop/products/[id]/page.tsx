"use client"

import React from 'react';
import RelatedProducts from './RelatedProducts';
import ProductDetails from './ProductDetails';
import { useGetProductById } from '@/hooks/useProduct';
import { useParams } from 'next/navigation';
import LoadingPage from '@/components/LoadingPage';
import ErrorPage from '@/components/ErrorPage';
import EmptyElement from '@/components/EmptyElement';

const ProductPage: React.FC = () => {
  const params = useParams()
  const productId = Number(params.id)

  const { data, isFetching, isError, error, refetch } = useGetProductById(productId)
  const product = data?.data

  return (
    <div className="bg-background h-full">
      <div className="h-full max-w-7xl mx-auto px-1 sm:px-2">
        {isFetching ?
          <LoadingPage className='h-80vh' />
          : isError ?
            <ErrorPage msg={error.message} action={refetch} />
            : !product
              ? <EmptyElement title='Product not found' />
              : <React.Fragment>

                <ProductDetails product={product} />

                <RelatedProducts id={productId} />
              </React.Fragment>
        }
      </div>
    </div>
  );
};


export default ProductPage;