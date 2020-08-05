package product.service.persistence.product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import product.service.mappers.ProductMapper;
import product.service.services.product.ProductDTO;
import product.service.web.filters.ProductFilter;

@Component
public class ProductProviderImpl implements ProductProvider {

    private final ProductMapper productMapper;

    private final ProductRepository productRepository;

    public ProductProviderImpl(ProductMapper productMapper,
                               ProductRepository productRepository) {
        this.productMapper = productMapper;
        this.productRepository = productRepository;
    }

    @Override
    public Page<ProductDTO> getAll(Pageable pageable, ProductFilter productFilter) {
        return productRepository.findAllByFilter(pageable, productFilter)
                .map(productMapper::toDTO);
    }

    @Override
    public ProductDTO getOne(Long id) {
        return productMapper.toDTO(
                productRepository.findById(id)
                        .orElseThrow(IllegalAccessError::new)
        );
    }

    @Override
    public ProductDTO save(ProductDTO productDTO) {
        Product product = productMapper.toModel(productDTO);
        return productMapper.toDTO(
                productRepository.save(product)
        );
    }

    @Override
    public void delete(Long id) {
        productRepository.deleteById(id);
    }

}
