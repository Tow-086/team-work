package org.example.newschool.result;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

// PageResult.java
@Data
@AllArgsConstructor
public class PageResult<T> {
    private int total;
    private int page;
    private int pageSize;
    private List<T> list;

}