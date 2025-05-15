package com.kreitek.managment.infrastructure.specs;


import com.kreitek.managment.infrastructure.specs.shared.SearchCriteria;
import com.kreitek.managment.domain.entity.User;
import com.kreitek.managment.infrastructure.specs.shared.EntitySpecification;
import com.kreitek.managment.infrastructure.specs.shared.SearchCriteria;
import org.springframework.data.jpa.domain.Specification;
import java.util.List;

public class ItemSpecification extends EntitySpecification<User> implements Specification<User> {


    public ItemSpecification(List<SearchCriteria> criteria) {
        this.criteria = criteria;
    }

}